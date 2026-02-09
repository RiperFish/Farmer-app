const App = {
  currentUser: null,

  users: {
    'john@example.com': {
      id: '1',
      name: 'John Martinez',
      email: 'john@example.com',
      phone: '501-622-1234',
      district: 'Cayo',
      village: 'San Ignacio',
      status: 'verified',
      farmerId: 'BZ-CAYO-2024-001234',
      profileImageUrl: 'https://images.pexels.com/photos/2382325/pexels-photo-2382325.jpeg?auto=compress&cs=tinysrgb&w=300',
      registrationDate: new Date('2024-01-15'),
      verificationDate: new Date('2024-02-01')
    },
    'maria@example.com': {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@example.com',
      phone: '501-633-5678',
      district: 'Orange Walk',
      village: 'Orange Walk Town',
      status: 'pending',
      farmerId: null,
      registrationDate: new Date('2024-10-20'),
      verificationDate: null
    }
  },

  pageTitles: {
    'index.html': 'BAIMS Farmer Hub',
    'weather.html': 'Weather',
    'calendar.html': 'Planting Calendar',
    'resources.html': 'Resources',
    'login.html': 'Login',
    'register.html': 'Register',
    'dashboard.html': 'Dashboard',
    'profile.html': 'My Profile',
    'farmer-id.html': 'Farmer ID',
    'farm-records.html': 'Farm Records',
    'notifications.html': 'Notifications',
    'commodities.html': 'Commodities'
  },

  init() {
    this.checkAuthState();
    this.setupEventListeners();
    this.updateUI();
    this.updateTopNav();
  },

  checkAuthState() {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  },

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.menu-btn')) {
        this.toggleMenu();
      }
      if (e.target.closest('.close-btn')) {
        this.closeMenu();
      }
      if (e.target.closest('.nav-overlay')) {
        this.closeMenu();
      }
      if (e.target.closest('.logout-btn')) {
        this.logout();
      }
      if (e.target.closest('.toast-close')) {
        const toast = e.target.closest('.toast');
        if (toast) toast.remove();
      }
    });
  },

  toggleMenu() {
    const nav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.nav-overlay');
    if (nav && overlay) {
      nav.classList.toggle('open');
      overlay.classList.toggle('open');
    }
  },

  closeMenu() {
    const nav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.nav-overlay');
    if (nav && overlay) {
      nav.classList.remove('open');
      overlay.classList.remove('open');
    }
  },

  login(email, password) {
    const emailLower = email.toLowerCase();

    if (this.users[emailLower]) {
      this.currentUser = this.users[emailLower];
    } else {
      this.currentUser = {
        id: Date.now().toString(),
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        phone: '501-000-0000',
        district: 'Belize',
        village: 'Belize City',
        status: 'unverified',
        farmerId: null,
        registrationDate: new Date(),
        verificationDate: null
      };
    }

    sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.showToast('Welcome back!', `Logged in as ${this.currentUser.name}`, 'success');

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 500);

    return true;
  },

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
    this.showToast('Logged out', 'You have been successfully logged out', 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  },

  register(formData) {
    this.showToast('Registration Successful', 'Please login with your credentials. An extension officer will verify your account.', 'success');

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  },

  updateUI() {
    this.updateHeader();
    this.updateBottomNav();
  },

  updateHeader() {
    const headerRight = document.querySelector('.header-right');
    if (!headerRight) return;

    if (this.currentUser) {
      headerRight.innerHTML = `
        <a href="notifications.html" class="notification-btn" aria-label="Notifications">
          <span>&#x1F514;</span>
          <span class="notification-badge">2</span>
        </a>
        <button class="logout-btn">Logout</button>
      `;
    } else {
      headerRight.innerHTML = `
        <a href="login.html" class="login-btn">Login</a>
      `;
    }
  },

  updateBottomNav() {
    const bottomNav = document.querySelector('.bottom-nav');
    if (!bottomNav) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (this.currentUser) {
      if (this.currentUser.status === 'verified') {
        bottomNav.innerHTML = `
          <div class="nav-items">
            <a href="dashboard.html" class="nav-item ${currentPage === 'dashboard.html' ? 'active' : ''}" aria-label="Home">
              <img src="assets/img/home.svg" alt="">
              <span class="nav-label">Home</span>
            </a>
            <a href="farmer-id.html" class="nav-item ${currentPage === 'farmer-id.html' ? 'active' : ''}" aria-label="Farmer ID">
              <img src="assets/img/id.svg" alt="">
              <span class="nav-label">ID</span>
            </a>
            <a href="profile.html" class="nav-item ${currentPage === 'profile.html' ? 'active' : ''}" aria-label="Profile">
              <img src="assets/img/user-black.svg" alt="">
              <span class="nav-label">Profile</span>
            </a>
            <a href="farm-records.html" class="nav-item ${currentPage === 'farm-records.html' ? 'active' : ''}" aria-label="Farm Records">
              <img src="assets/img/farm.svg" alt="">
              <span class="nav-label">Farm</span>
            </a>
            <a href="commodities.html" class="nav-item ${currentPage === 'commodities.html' ? 'active' : ''}" aria-label="Commodities">
              <img src="assets/img/commodities.svg" alt="">
              <span class="nav-label">Crops</span>
            </a>
          </div>
        `;
      } else {
        bottomNav.innerHTML = `
          <div class="nav-items">
            <a href="dashboard.html" class="nav-item ${currentPage === 'dashboard.html' ? 'active' : ''}" aria-label="Dashboard">
              <img src="assets/img/home.svg" alt="">
              <span class="nav-label">Home</span>
            </a>
            <a href="profile.html" class="nav-item ${currentPage === 'profile.html' ? 'active' : ''}" aria-label="Profile">
              <img src="assets/img/user-black.svg" alt="">
              <span class="nav-label">Profile</span>
            </a>
            <a href="weather.html" class="nav-item ${currentPage === 'weather.html' ? 'active' : ''}" aria-label="Weather">
              <img src="assets/img/weather.svg" alt="">
              <span class="nav-label">Weather</span>
            </a>
            <a href="resources.html" class="nav-item ${currentPage === 'resources.html' ? 'active' : ''}" aria-label="Resources">
              <img src="assets/img/phone.svg" alt="">
              <span class="nav-label">Contact</span>
            </a>
          </div>
        `;
      }
    } else {
      bottomNav.innerHTML = `
        <div class="nav-items">
          <a href="index.html" class="nav-item ${currentPage === 'index.html' ? 'active' : ''}" aria-label="Home">
            <img src="assets/img/home.svg" alt="">
            <span class="nav-label">Home</span>
          </a>
          <a href="weather.html" class="nav-item ${currentPage === 'weather.html' ? 'active' : ''}" aria-label="Weather">
            <img src="assets/img/weather.svg" alt="">
            <span class="nav-label">Weather</span>
          </a>
          <a href="resources.html" class="nav-item ${currentPage === 'resources.html' ? 'active' : ''}" aria-label="Resources">
            <img src="assets/img/phone.svg" alt="">
            <span class="nav-label">Contact</span>
          </a>
          <a href="login.html" class="nav-item ${currentPage === 'login.html' ? 'active' : ''}" aria-label="Login">
            <img src="assets/img/user-black.svg" alt="">
            <span class="nav-label">Login</span>
          </a>
        </div>
      `;
    }
  },

  updateTopNav() {
    const topNav = document.querySelector('.top-nav');
    if (!topNav) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const title = this.pageTitles[currentPage] || 'BAIMS Farmer Hub';
    const rootPages = this.currentUser ? ['dashboard.html'] : ['index.html'];
    const isRoot = rootPages.includes(currentPage);

    const backButton = isRoot
      ? '<div class="top-nav-placeholder"></div>'
      : `<button class="top-nav-back" onclick="history.back()" aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>`;

    topNav.innerHTML = `
      ${backButton}
      <h1 class="top-nav-title">${title}</h1>
      <div class="top-nav-placeholder"></div>
    `;
  },

  showToast(title, message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = {
      success: '&#x2705;',
      warning: '&#x26A0;&#xFE0F;',
      error: '&#x274C;',
      info: '&#x2139;&#xFE0F;'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastSlideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  getUserInitials() {
    if (!this.currentUser) return 'U';
    return this.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
  },

  getStatusText() {
    if (!this.currentUser) return '';
    const status = this.currentUser.status;
    if (status === 'verified') return 'Verified Farmer';
    if (status === 'pending') return 'Verification Pending';
    return 'Unverified';
  },

  isVerified() {
    return this.currentUser && this.currentUser.status === 'verified';
  },

  formatDate(date, format = 'medium') {
    if (!date) return '';
    const d = new Date(date);
    const options = {
      short: { month: 'short', day: 'numeric' },
      medium: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric' }
    };
    return d.toLocaleDateString('en-US', options[format] || options.medium);
  },

  getTimeAgo(date) {
    const now = new Date().getTime();
    const diff = now - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  },

  getDayName(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(date).getDay()];
  }
};

const Data = {
  getWeatherForecast() {
    const today = new Date();
    const forecasts = [];
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Scattered Showers', 'Rain'];
    const icons = ['&#x2600;&#xFE0F;', '&#x26C5;', '&#x2601;&#xFE0F;', '&#x1F326;&#xFE0F;', '&#x1F327;&#xFE0F;'];

    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      forecasts.push({
        date,
        temperature: {
          high: 85 + Math.floor(Math.random() * 10),
          low: 70 + Math.floor(Math.random() * 10),
          current: i === 0 ? 78 : 0
        },
        condition: conditions[i % conditions.length],
        humidity: 65 + Math.floor(Math.random() * 30),
        rainfall: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0,
        icon: icons[i % icons.length]
      });
    }

    return forecasts;
  },

  getNews() {
    return [
      {
        id: '1',
        title: 'New Agricultural Support Program Announced',
        summary: 'Government announces $5M fund to support small-scale farmers across all districts.',
        date: new Date('2024-11-15'),
        category: 'Programs'
      },
      {
        id: '2',
        title: 'Hurricane Season Preparedness',
        summary: 'Ministry of Agriculture reminds farmers to prepare for hurricane season.',
        date: new Date('2024-11-10'),
        category: 'Weather'
      },
      {
        id: '3',
        title: 'New Pest Control Guidelines Released',
        summary: 'Updated guidelines for managing fall armyworm in corn crops.',
        date: new Date('2024-11-05'),
        category: 'Technical'
      }
    ];
  },

  getSeasonalTips() {
    return [
      {
        id: '1',
        title: 'Planting Season Preparation',
        description: 'Prepare your land for the upcoming planting season. Clear fields and check soil conditions.',
        crops: ['Corn', 'Beans', 'Rice']
      },
      {
        id: '2',
        title: 'Irrigation Management',
        description: 'Monitor water levels and ensure irrigation systems are functioning properly.',
        crops: ['Vegetables', 'Citrus']
      }
    ];
  },

  getCropCalendar() {
    return [
      { crop: 'Corn', category: 'Grains', plantingMonths: [5, 6, 10, 11], harvestMonths: [8, 9, 1, 2], duration: '90-120 days', notes: 'Two growing seasons per year' },
      { crop: 'Red Kidney Beans', category: 'Legumes', plantingMonths: [10, 11, 12], harvestMonths: [1, 2, 3], duration: '75-90 days', notes: 'Best planted in dry season' },
      { crop: 'Rice', category: 'Grains', plantingMonths: [6, 7], harvestMonths: [10, 11], duration: '120-150 days', notes: 'Requires consistent water supply' },
      { crop: 'Tomatoes', category: 'Vegetables', plantingMonths: [1, 2, 3, 10, 11, 12], harvestMonths: [3, 4, 5, 12, 1, 2], duration: '60-80 days', notes: 'Year-round with proper irrigation' },
      { crop: 'Cabbage', category: 'Vegetables', plantingMonths: [11, 12, 1], harvestMonths: [2, 3, 4], duration: '70-90 days', notes: 'Cool season crop' },
      { crop: 'Papaya', category: 'Fruits', plantingMonths: [1, 2, 3, 4, 5], harvestMonths: [0], duration: '9-12 months', notes: 'Harvest year-round after maturity' },
      { crop: 'Citrus', category: 'Fruits', plantingMonths: [5, 6, 7], harvestMonths: [11, 12, 1, 2], duration: '2-3 years to bearing', notes: 'Long-term crop' },
      { crop: 'Hot Peppers', category: 'Vegetables', plantingMonths: [1, 2, 3, 4, 5, 6], harvestMonths: [0], duration: '60-90 days', notes: 'Continuous harvest' }
    ];
  },

  getResources() {
    return [
      { id: '1', category: 'Extension Services', name: 'Belize Agricultural Health Authority', phone: '501-824-3773', email: 'info@baha.org.bz', website: 'www.baha.org.bz', address: 'Belmopan, Cayo District' },
      { id: '2', category: 'Extension Services', name: 'Cayo District Extension Office', district: 'Cayo', phone: '501-824-2210', address: 'San Ignacio Town' },
      { id: '3', category: 'Extension Services', name: 'Orange Walk District Extension Office', district: 'Orange Walk', phone: '501-322-2877', address: 'Orange Walk Town' },
      { id: '4', category: 'Extension Services', name: 'Toledo District Extension Office', district: 'Toledo', phone: '501-722-2707', address: 'Punta Gorda' },
      { id: '5', category: 'Financial Support', name: 'Development Finance Corporation', phone: '501-227-2892', email: 'info@dfc.bz', website: 'www.dfc.bz', address: 'Belize City' },
      { id: '6', category: 'Marketing', name: 'Belize Marketing & Development Corporation', phone: '501-203-0333', address: 'Belmopan' },
      { id: '7', category: 'Emergency', name: 'National Emergency Management Organization', phone: '501-822-2054', website: 'www.nemo.org.bz', address: 'Belmopan' }
    ];
  },

  getFarmData() {
    return {
      id: 'F001',
      name: 'Martinez Family Farm',
      district: 'Cayo',
      village: 'San Ignacio',
      totalAcres: 25,
      plots: [
        { id: 'P1', name: 'North Field', acres: 10, cropType: 'Corn', plantingDate: new Date('2024-06-15'), harvestDate: new Date('2024-10-15'), status: 'active' },
        { id: 'P2', name: 'South Field', acres: 8, cropType: 'Red Kidney Beans', plantingDate: new Date('2024-11-01'), harvestDate: new Date('2025-02-15'), status: 'active' },
        { id: 'P3', name: 'East Field', acres: 7, cropType: 'Vegetables', status: 'fallow' }
      ]
    };
  },

  getNotifications() {
    return [
      { id: '1', title: 'Weather Alert', message: 'Heavy rainfall expected in next 48 hours. Secure your crops and equipment.', date: new Date(), read: false, type: 'warning' },
      { id: '2', title: 'New Support Program Available', message: 'You are eligible for the Small Farmer Support Program. Click to learn more.', date: new Date(Date.now() - 86400000), read: false, type: 'info' },
      { id: '3', title: 'Profile Verified', message: 'Your farmer profile has been successfully verified. You now have full access.', date: new Date(Date.now() - 172800000), read: true, type: 'success' }
    ];
  },

  getCommodities() {
    return [
      { icon: '&#x1F33D;', name: 'Corn', category: 'Grains', status: 'growing', acres: 10, plantingDate: new Date('2024-06-15'), harvestDate: new Date('2025-10-15'), expectedYield: '8,000 lbs', progress: 65 },
      { icon: '&#x1FAD8;', name: 'Red Kidney Beans', category: 'Legumes', status: 'planted', acres: 8, plantingDate: new Date('2024-11-01'), harvestDate: new Date('2025-02-15'), expectedYield: '6,000 lbs', progress: 25 },
      { icon: '&#x1F96C;', name: 'Vegetables (Mixed)', category: 'Vegetables', status: 'growing', acres: 5, plantingDate: new Date('2024-10-01'), expectedYield: '2,500 lbs', progress: 50 }
    ];
  },

  getProductionHistory() {
    return [
      { icon: '&#x1F33D;', crop: 'Corn', season: '2024 Season 1', yield: '7,500 lbs' },
      { icon: '&#x1FAD8;', crop: 'Red Kidney Beans', season: '2023-2024', yield: '5,800 lbs' },
      { icon: '&#x1F96C;', crop: 'Vegetables', season: '2024 Season 1', yield: '2,200 lbs' }
    ];
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
