import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Active' | 'Planning' | 'Completed';
  startDate: string;
  endDate: string;
  budget: string;
  beneficiaries: number;
  organization: string;
  imageUrl: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  coverage: string;
  applicationUrl: string;
}

@Component({
  selector: 'app-ongoing-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="projects-container">
      <div class="filter-section">
        <div class="filter-buttons">
          <button
            *ngFor="let cat of categories"
            class="filter-btn"
            [class.active]="selectedCategory() === cat"
            (click)="filterByCategory(cat)">
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="projects-grid">
        <div *ngFor="let project of filteredProjects()" class="project-card">
          <div class="project-image">
            <img [src]="project.imageUrl" [alt]="project.title">
            <div class="status-badge" [class.active]="project.status === 'Active'"
                 [class.planning]="project.status === 'Planning'"
                 [class.completed]="project.status === 'Completed'">
              {{ project.status }}
            </div>
          </div>

          <div class="project-content">
            <div class="project-category">{{ project.category }}</div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>

            <div class="project-meta">
              <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>{{ project.startDate }} - {{ project.endDate }}</span>
              </div>
              <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>{{ project.beneficiaries }} farmers</span>
              </div>
              <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ project.budget }}</span>
              </div>
              <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ project.coverage }}</span>
              </div>
            </div>

            <div class="project-footer">
              <div class="organization">
                <svg class="org-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ project.organization }}</span>
              </div>
              <a [href]="project.applicationUrl" target="_blank" class="contact-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 16px; height: 16px;">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Download Application
              </a>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="filteredProjects().length === 0" class="no-results">
        <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" stroke-width="2"/>
          <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>No projects found in this category</p>
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
    }

    .page-header {
      margin-bottom: 32px;
    }

    .page-title {
      font-size: 32px;
      font-weight: 800;
      color: #1a3a1a;
      margin: 0 0 8px 0;
    }

    .page-subtitle {
      font-size: 16px;
      color: #666;
      margin: 0;
    }

    .filter-section {
      margin-top: 16px;
      margin-bottom: 32px;
    }

    .filter-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 10px 20px;
      border: 2px solid #e0e0e0;
      background: white;
      border-radius: 24px;
      font-size: 14px;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .filter-btn:hover {
      border-color: #2d7a3e;
      color: #2d7a3e;
    }

    .filter-btn.active {
      background: #2d7a3e;
      color: white;
      border-color: #2d7a3e;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .project-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .project-card:hover {
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      transform: translateY(-4px);
    }

    .project-image {
      position: relative;
      height: 200px;
      overflow: hidden;
      background: linear-gradient(135deg, #d4edda, #a8d5b5);
    }

    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .status-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-badge.active {
      background: #28a745;
      color: white;
    }

    .status-badge.planning {
      background: #ffc107;
      color: #333;
    }

    .status-badge.completed {
      background: #6c757d;
      color: white;
    }

    .project-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .project-category {
      font-size: 12px;
      font-weight: 700;
      color: #2d7a3e;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .project-title {
      font-size: 20px;
      font-weight: 700;
      color: #1a3a1a;
      margin: 0 0 12px 0;
      line-height: 1.3;
    }

    .project-description {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
      margin: 0 0 16px 0;
      flex: 1;
    }

    .project-meta {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 16px 0;
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 16px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #555;
    }

    .meta-icon {
      width: 18px;
      height: 18px;
      color: #2d7a3e;
      flex-shrink: 0;
    }

    .project-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .organization {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: #666;
      flex: 1;
      min-width: 0;
    }

    .org-icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: #999;
    }

    .organization span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .contact-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: #2d7a3e;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
      text-decoration: none;
    }

    .contact-btn:hover {
      background: #1e5d2f;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(45, 122, 62, 0.3);
    }

    .no-results {
      text-align: center;
      padding: 60px 20px;
      color: #999;
    }

    .no-results-icon {
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      opacity: 0.3;
    }

    .no-results p {
      font-size: 16px;
      margin: 0;
    }

    @media (max-width: 768px) {
      .projects-container {
        padding: 16px;
      }

      .page-title {
        font-size: 26px;
      }

      .page-subtitle {
        font-size: 14px;
      }

      .projects-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .filter-buttons {
        gap: 8px;
      }

      .filter-btn {
        padding: 8px 16px;
        font-size: 13px;
      }
    }

    @media (max-width: 480px) {
      .projects-container {
        padding: 12px;
      }

      .page-title {
        font-size: 22px;
      }

      .project-image {
        height: 160px;
      }

      .project-content {
        padding: 16px;
      }

      .project-title {
        font-size: 18px;
      }

      .project-footer {
        flex-direction: column;
        align-items: stretch;
      }

      .contact-btn {
        width: 100%;
      }
    }
  `]
})
export class OngoingProjectsComponent {
  selectedCategory = signal<string>('All');

  categories = [
    'All',
    'Training',
    'Infrastructure',
    'Funding',
    'Technology',
    'Sustainability'
  ];

  projects: Project[] = [
    {
      id: '1',
      title: 'Climate-Smart Agriculture Training Program',
      description: 'Comprehensive training on sustainable farming practices, water conservation, and climate adaptation strategies for small-scale farmers.',
      category: 'Training',
      status: 'Active',
      startDate: 'Jan 2025',
      endDate: 'Dec 2026',
      budget: 'BZ$850,000',
      beneficiaries: 450,
      organization: 'Ministry of Agriculture',
      imageUrl: 'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=800',
      contactEmail: 'climate@agriculture.gov.bz',
      contactPhone: '223-1234',
      location: 'Nationwide',
      coverage: 'All Districts',
      applicationUrl: '#'
    },
    {
      id: '2',
      title: 'Rural Irrigation Infrastructure Development',
      description: 'Installation of modern irrigation systems in farming communities to improve water access and crop yields during dry seasons.',
      category: 'Infrastructure',
      status: 'Active',
      startDate: 'Mar 2025',
      endDate: 'Nov 2025',
      budget: 'BZ$1.2M',
      beneficiaries: 280,
      organization: 'Caribbean Development Bank',
      imageUrl: 'https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg?auto=compress&cs=tinysrgb&w=800',
      contactEmail: 'irrigation@cdb.org',
      contactPhone: '227-5432',
      location: 'Cayo, Orange Walk',
      coverage: 'Cayo, Orange Walk',
      applicationUrl: '#'
    },
    {
      id: '3',
      title: 'Young Farmers Entrepreneurship Fund',
      description: 'Grant program supporting youth entrepreneurs in agriculture with startup capital, mentorship, and business development training.',
      category: 'Funding',
      status: 'Active',
      startDate: 'Feb 2025',
      endDate: 'Feb 2027',
      budget: 'BZ$600,000',
      beneficiaries: 150,
      organization: 'Belize Enterprise for Sustainable Technology',
      imageUrl: 'https://images.pexels.com/photos/3856033/pexels-photo-3856033.jpeg?auto=compress&cs=tinysrgb&w=800',
      contactEmail: 'grants@best.org.bz',
      contactPhone: '223-6789',
      location: 'All Districts',
      coverage: 'Nationwide (Age 18-35)',
      applicationUrl: '#'
    },
    {
      id: '4',
      title: 'Digital Farming Technology Adoption',
      description: 'Providing farmers with mobile apps, weather stations, and IoT sensors to enable data-driven farming decisions and market access.',
      category: 'Technology',
      status: 'Planning',
      startDate: 'Jun 2025',
      endDate: 'Jun 2026',
      budget: 'BZ$400,000',
      beneficiaries: 320,
      organization: 'Inter-American Development Bank',
      imageUrl: 'https://images.pexels.com/photos/4886690/pexels-photo-4886690.jpeg?auto=compress&cs=tinysrgb&w=800',
      contactEmail: 'digitalag@iadb.org',
      contactPhone: '227-8901',
      location: 'Stann Creek, Toledo',
      coverage: 'Stann Creek, Toledo',
      applicationUrl: '#'
    },
    {
      id: '5',
      title: 'Organic Farming Certification Support',
      description: 'Assisting farmers in transitioning to organic practices and obtaining international certifications for premium market access.',
      category: 'Sustainability',
      status: 'Active',
      startDate: 'Jan 2025',
      endDate: 'Dec 2025',
      budget: 'BZ$280,000',
      beneficiaries: 95,
      organization: 'Belize Organic Producers Association',
      imageUrl: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=800',
      contactEmail: 'organic@bopa.bz',
      contactPhone: '223-4567',
      location: 'Cayo, Toledo',
      coverage: 'Cayo, Toledo',
      applicationUrl: '#'
    },
    {
      id: '6',
      title: 'Farm-to-Market Road Rehabilitation',
      description: 'Upgrading rural roads to improve transportation of agricultural products and reduce post-harvest losses.',
      category: 'Infrastructure',
      status: 'Active',
      startDate: 'Apr 2025',
      endDate: 'Mar 2026',
      budget: 'BZ$2.1M',
      beneficiaries: 680,
      organization: 'Ministry of Infrastructure',
      imageUrl: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800',
      contactEmail: 'roads@infrastructure.gov.bz',
      contactPhone: '227-2345',
      location: 'Orange Walk, Corozal',
      coverage: 'Orange Walk, Corozal',
      applicationUrl: '#'
    },
    {
      id: '7',
      title: 'Pest and Disease Management Training',
      description: 'Workshops on integrated pest management, disease prevention, and safe use of biological controls for crop protection.',
      category: 'Training',
      status: 'Active',
      startDate: 'Feb 2025',
      endDate: 'Nov 2025',
      budget: 'BZ$180,000',
      beneficiaries: 410,
      organization: 'FAO Belize',
      imageUrl: 'https://images.pexels.com/photos/4749134/pexels-photo-4749134.jpeg?auto=compress&cs=tinysrgb&w=800',
      contactEmail: 'training@fao.org',
      contactPhone: '223-7890',
      location: 'All Districts',
      coverage: 'All Districts',
      applicationUrl: '#'
    },
    {
      id: '8',
      title: 'Agricultural Microfinance Program',
      description: 'Low-interest loans and financial literacy training to help small-scale farmers invest in equipment, seeds, and technology.',
      category: 'Funding',
      status: 'Active',
      startDate: 'Jan 2025',
      endDate: 'Jan 2028',
      budget: 'BZ$3.5M',
      beneficiaries: 820,
      organization: 'Belize Credit Union League',
      imageUrl: 'https://images.pexels.com/photos/5750089/pexels-photo-5750089.jpeg?auto=compress&cs=tinysrgb&w=800',
      contactEmail: 'microfinance@bcul.bz',
      contactPhone: '227-3456',
      location: 'Nationwide',
      coverage: 'All Districts',
      applicationUrl: '#'
    },
    {
      id: '9',
      title: 'Solar Energy for Farmers Initiative',
      description: 'Subsidized solar panels and renewable energy systems for farms to reduce operational costs and environmental impact.',
      category: 'Sustainability',
      status: 'Planning',
      startDate: 'Aug 2025',
      endDate: 'Aug 2026',
      budget: 'BZ$920,000',
      beneficiaries: 165,
      organization: 'Belize Sustainable Energy',
      imageUrl: 'https://images.pexels.com/photos/6197118/pexels-photo-6197118.jpeg?auto=compress&cs=tinysrgb&w=800',
      contactEmail: 'solar@bse.bz',
      contactPhone: '223-5678',
      location: 'Cayo, Belize',
      coverage: 'Cayo, Belize District',
      applicationUrl: '#'
    }
  ];

  filteredProjects = signal<Project[]>(this.projects);

  filterByCategory(category: string) {
    this.selectedCategory.set(category);
    if (category === 'All') {
      this.filteredProjects.set(this.projects);
    } else {
      this.filteredProjects.set(
        this.projects.filter(p => p.category === category)
      );
    }
  }
}
