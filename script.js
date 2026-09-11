const header = document.querySelector('[data-header]');

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const siteChapter = document.querySelector('[data-site-chapter]');
const chapterSections = [...document.querySelectorAll('[data-chapter-title]')];
const chapterLabel = siteChapter?.querySelector('[data-site-chapter-label]');
const chapterProgress = siteChapter?.querySelector('[data-site-chapter-progress]');
const chapterCount = siteChapter?.querySelector('[data-site-chapter-count]');

const updateSiteChapter = () => {
  if (!siteChapter || !chapterSections.length) return;
  const marker = window.scrollY + Math.min(window.innerHeight * .34, 280);
  let activeIndex = 0;
  chapterSections.forEach((section, index) => {
    if (section.offsetTop <= marker) activeIndex = index;
  });
  const activeSection = chapterSections[activeIndex];
  const total = chapterSections.length;
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const scrollProgress = Math.min(window.scrollY / maxScroll, 1);
  if (chapterLabel) chapterLabel.textContent = activeSection.dataset.chapterTitle;
  if (chapterCount) chapterCount.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  if (chapterProgress) chapterProgress.style.width = `${Math.max(scrollProgress * 100, 4)}%`;
  document.body.dataset.chapterTone = activeSection.dataset.chapterTone ?? '';
};

updateSiteChapter();
window.addEventListener('scroll', updateSiteChapter, { passive: true });
window.addEventListener('resize', updateSiteChapter);

const assistantDialog = document.querySelector('[data-assistant-dialog]');
const assistantOpenButton = document.querySelector('[data-assistant-open]');
const assistantCloseButton = document.querySelector('[data-assistant-close]');
const assistantMessages = document.querySelector('[data-assistant-messages]');
const assistantForm = document.querySelector('[data-assistant-form]');
const assistantInput = document.querySelector('#assistant-question');

const assistantAnswers = {
  background: 'Jovanny Figueroa is a Mexican-American computer science student at the Grainger College of Engineering at UIUC. He was born and raised in Chicago, and expects to graduate in 2030.',
  languages: 'Jovanny is bilingual in English and Spanish, and also knows a bit of Mandarin.',
  mission: 'Jovanny’s biggest goal is to become a machine learning engineer and contribute to the teams building the future of AI. He is focused on learning the foundations, developing models, and turning research into useful systems. Making AI more accessible is an important reason he cares about the field, but his broader aim is to help move the technology forward.',
  work: 'Jovanny has built two iOS concepts and an AI FAQ chatbot. HearMeOut makes conversations more visible for deaf and hard-of-hearing users. Clarity supports people who need help expressing themselves, reading text, or revisiting conversations. During his 2025–2026 internship at OnYourMark Education, he built a chatbot for the company’s private website that answered common questions and stopped the recurring influx of support tickets.',
  hearmeout: 'HearMeOut is an accessibility concept for deaf and hard-of-hearing users. The site includes the full nine-slide presentation and its original demo video.',
  clarity: 'Clarity is an accessibility concept built around three needs: expressing yourself, understanding text, and revisiting a conversation. The full eight-slide presentation and demo are on the site.',
  internship: 'During his 2025–2026 internship at OnYourMark Education, Jovanny built an AI chatbot for the company’s private website. It answered FAQs and common questions directly, so the recurring influx of support tickets no longer happened after it was introduced.',
  interests: 'Outside of code, Jovanny enjoys the gym, running, finding new food spots, hiking, anime, comics, movies, and shows. Chest day is still the best day.',
  contact: 'You can reach Jovanny at jfigu53@illinois.edu. You can also find him on GitHub at github.com/jovannyf1 and LinkedIn at linkedin.com/in/jovanny-figueroa-658091256/.',
  site: 'The site covers Jovanny’s background, mission, selected work, his OnYourMark internship chatbot, full HearMeOut and Clarity decks, embedded demos, interests, and contact links.',
  assistant: 'I’m Águila, a small site guide that runs locally in your browser. I answer questions about Jovanny and this website without sending anything to an AI API.',
};

const assistantOutOfScope = 'That is outside Águila’s lane. I’m here to help with Jovanny and this site: his background, projects, interests, or ways to contact him.';

const answerAssistantQuestion = (question) => {
  const query = question.trim().toLowerCase();
  if (!query) return 'Ask me about Jovanny, his work, his interests, or how to contact him.';
  if (/^(hi|hello|hey|yo)\b/.test(query)) return 'Hey. Ask me about Jovanny, his projects, his interests, or how to reach him.';
  if (/(how does|what is|are you|what can you|what do you|this assistant|site guide|api|api key|cost)/.test(query) && /(assistant|site guide|what can you|what do you|api|api key|cost|\bai\b)/.test(query)) return assistantAnswers.assistant;
  if (/(contact|email|reach|linkedin|github|hire|message)/.test(query)) return assistantAnswers.contact;
  if (/(hearmeout|hearme out|hearing|deaf|hard of hearing)/.test(query)) return assistantAnswers.hearmeout;
  if (/(clarity|dyslexia|adhd|express myself|expressing)/.test(query)) return assistantAnswers.clarity;
  if (/(language|languages|spanish|english|mandarin|bilingual|speak)/.test(query)) return assistantAnswers.languages;
  if (/(onyourmark|internship|intern|chatbot|faq|support ticket|support tickets|support influx)/.test(query)) return assistantAnswers.internship;
  if (/(project|projects|built|app|apps|ios|portfolio)/.test(query)) return assistantAnswers.work;
  if (/(gym|running|food|hiking|adventure|anime|comic|movie|film|outside|hobby|hobbies|breaking bad|better call saul|obsession)/.test(query)) return assistantAnswers.interests;
  if (/(mission|goal|future|career|engineer|\bai\b|machine learning|ml engineer|accessib)/.test(query)) return assistantAnswers.mission;
  if (/(site|website|page|section|slides|deck|video)/.test(query)) return assistantAnswers.site;
  if (/(who is|what does|where is|where.*from|jovanny|background|chicago|mexican|catholic|uiuc|grainger|school|study|major|graduate)/.test(query)) return assistantAnswers.background;
  return assistantOutOfScope;
};

const appendAssistantMessage = (text, role) => {
  if (!assistantMessages) return;
  const message = document.createElement('p');
  message.className = `assistant-message assistant-message-${role}`;
  message.textContent = text;
  assistantMessages.append(message);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
};

const submitAssistantQuestion = (question) => {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  appendAssistantMessage(cleanQuestion, 'user');
  appendAssistantMessage(answerAssistantQuestion(cleanQuestion), 'answer');
  if (assistantInput) assistantInput.value = '';
};

if (assistantDialog && assistantOpenButton) {
  assistantOpenButton.addEventListener('click', () => {
    assistantDialog.showModal();
    assistantOpenButton.setAttribute('aria-expanded', 'true');
    assistantInput?.focus();
  });

  assistantCloseButton?.addEventListener('click', () => assistantDialog.close());
  assistantDialog.addEventListener('close', () => assistantOpenButton.setAttribute('aria-expanded', 'false'));
  assistantDialog.addEventListener('click', (event) => {
    if (event.target === assistantDialog) assistantDialog.close();
  });
  assistantForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    submitAssistantQuestion(assistantInput?.value ?? '');
  });
  document.querySelectorAll('[data-assistant-prompt]').forEach((button) => {
    button.addEventListener('click', () => submitAssistantQuestion(button.dataset.assistantPrompt ?? ''));
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const deckData = {
  hearmeout: [
    { src: 'assets/hearmeout-slides/01-cover.png', title: 'Cover', alt: 'HearMeOut presentation cover' },
    { src: 'assets/hearmeout-slides/02-introducing.png', title: 'Introducing HearMeOut', alt: 'Introducing HearMeOut presentation slide' },
    { src: 'assets/hearmeout-slides/03-challenge.png', title: 'The Challenge', alt: 'HearMeOut presentation slide about the challenge' },
    { src: 'assets/hearmeout-slides/04-mission.png', title: 'Our Mission', alt: 'HearMeOut presentation slide about the mission' },
    { src: 'assets/hearmeout-slides/05-app-demo.png', title: 'App Demo', alt: 'HearMeOut app demo presentation slide' },
    { src: 'assets/hearmeout-slides/06-how-it-works.png', title: 'How Our App Works', alt: 'HearMeOut presentation slide about how the app works' },
    { src: 'assets/hearmeout-slides/07-stand-out.png', title: 'How We Stand Out', alt: 'HearMeOut presentation slide about differentiation' },
    { src: 'assets/hearmeout-slides/08-future.png', title: 'The Future: Solo Listen', alt: 'HearMeOut presentation slide about the future Solo Listen feature' },
    { src: 'assets/hearmeout-slides/09-thank-you.png', title: 'Questions?', alt: 'HearMeOut closing presentation slide reading Questions?' },
  ],
  clarity: [
    { src: 'assets/clarity-slides/slide-1.png', title: 'Clarity', alt: 'Clarity presentation cover' },
    { src: 'assets/clarity-slides/slide-2.png', title: 'Meet the People Clarity Supports', alt: 'Clarity presentation slide introducing people with ADHD and dyslexia' },
    { src: 'assets/clarity-slides/slide-3.png', title: 'The Need Is Real', alt: 'Clarity presentation slide describing the need for accessibility support' },
    { src: 'assets/clarity-slides/slide-4.png', title: 'Our Solution', alt: 'Clarity presentation slide describing the solution' },
    { src: 'assets/clarity-slides/slide-5.png', title: 'Features', alt: 'Clarity presentation slide showing features' },
    { src: 'assets/clarity-slides/slide-6.png', title: 'Demo', alt: 'Clarity demo presentation slide' },
    { src: 'assets/clarity-slides/slide-7.png', title: 'How Clarity Stands Apart', alt: 'Clarity presentation slide comparing the product with existing options' },
    { src: 'assets/clarity-slides/slide-8.png', title: 'Clarity Will Be There', alt: 'Clarity closing presentation slide' },
  ],
};

const formatSlideNumber = (value) => String(value).padStart(2, '0');

document.querySelectorAll('[data-deck-jump]').forEach((button) => {
  button.addEventListener('click', () => {
    const viewer = document.getElementById(button.dataset.deckJump);
    if (!viewer) return;
    viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => viewer.querySelector('[data-deck-next]')?.focus(), 450);
  });
});

document.querySelectorAll('[data-deck-viewer]').forEach((viewer) => {
  const slides = deckData[viewer.dataset.deckViewer];
  if (!slides) return;

  const stage = viewer.querySelector('[data-deck-stage]');
  const title = viewer.querySelector('[data-deck-title]');
  const count = viewer.querySelector('[data-deck-count]');
  const thumbnails = viewer.querySelector('[data-deck-thumbnails]');
  const previous = viewer.querySelector('[data-deck-prev]');
  const next = viewer.querySelector('[data-deck-next]');
  let currentIndex = 0;

  const render = (index) => {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    const slide = slides[currentIndex];
    stage.src = slide.src;
    stage.alt = slide.alt;
    title.textContent = slide.title;
    count.textContent = `${formatSlideNumber(currentIndex + 1)} / ${formatSlideNumber(slides.length)}`;
    previous.disabled = currentIndex === 0;
    next.disabled = currentIndex === slides.length - 1;

    thumbnails.querySelectorAll('.deck-thumbnail').forEach((thumbnail, thumbnailIndex) => {
      thumbnail.setAttribute('aria-current', String(thumbnailIndex === currentIndex));
    });
  };

  slides.forEach((slide, index) => {
    const thumbnail = document.createElement('button');
    thumbnail.type = 'button';
    thumbnail.className = 'deck-thumbnail';
    thumbnail.setAttribute('role', 'listitem');
    thumbnail.setAttribute('aria-label', `View slide ${index + 1}: ${slide.title}`);
    thumbnail.setAttribute('aria-current', String(index === 0));
    const image = document.createElement('img');
    image.src = slide.src;
    image.alt = '';
    image.loading = index === 0 ? 'eager' : 'lazy';
    thumbnail.append(image);
    thumbnail.addEventListener('click', () => render(index));
    thumbnails.append(thumbnail);
  });

  previous.addEventListener('click', () => render(currentIndex - 1));
  next.addEventListener('click', () => render(currentIndex + 1));
  viewer.addEventListener('keydown', (event) => {
    if (event.target.closest('button, video, a')) return;
    if (event.key === 'ArrowLeft') render(currentIndex - 1);
    if (event.key === 'ArrowRight') render(currentIndex + 1);
  });

  render(0);
});
