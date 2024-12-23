import { Component } from '@angular/core';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { Whycdi24CardComponent } from '../../components/whycdi24-card/whycdi24-card.component';
import { CommonModule } from '@angular/common';
import { CDIbenefitCardComponent } from '../../components/cdibenefit-card/cdibenefit-card.component';
import { ScholarshipWinnerCardComponent } from '../../components/scholarship-winner-card/scholarship-winner-card.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CourseCardComponent,Whycdi24CardComponent,CDIbenefitCardComponent,ScholarshipWinnerCardComponent,CommonModule],
  templateUrl: './landing.component.html'
})
export class LandingComponent {
    courses = [
      {
        imageSrc: 'assets/img/development.png',
        title: 'Development & Tech',
        link: '/development',
      },
      {
        imageSrc: 'assets/img/graphics.png',
        title: 'Graphics & Creative',
        link: '/graphics',
      },
      {
        imageSrc: 'assets/img/data analytics.png',
        title: 'Data & Analytics',
        link: '/data-analytics',
      },
      {
        imageSrc: 'assets/img/writing.png',
        title: 'Writing & Content',
        link: '/writing',
      },
      {
        imageSrc: 'assets/img/music.png',
        title: 'Music & Audio',
        link: '/music',
      },
      {
        imageSrc: 'assets/img/language.png',
        title: 'Languages & Translation',
        link: '/languages',
      },
      {
        imageSrc: 'assets/img/ai.png',
        title: 'AI Services',
        link: '/ai-services',
      },
      {
        imageSrc: null,
        title: 'More Categories',
        link: '/more-categories',
      },
    ];


    // whycdi24 

    cardData = [
      {
        imageSrc: 'assets/img/cut-price-bargain-offering-reduced-cost-discount-low-rate-special-promo-scissors-dividing-banknote-crisis-bankruptcy-cheapness-market-vector-isolated-concept-metaphor-illustration_335657-4314-1.webp',
        title: 'Reasonable price',
        description: 'Our top-of-the-line courses are given online by experienced professionals that are always giving insight, tips and skill building exercises to give you the best possible learning experience and payment plan as you gain these highly demanded skills to build up your career. Our students always come first.'
      },
      {
        imageSrc: 'assets/img/istockphoto-1287403309-170667a.jpg',
        title: 'Short and every other day classes',
        description: 'Is your daily schedule busy with work and other activities? At CDI we make sure you utilize your time efficiently focusing on delivering concise yet informative classes with flexible schedules that easily fit in your day to day eliminating the old way of having to fit other activities around fixed class schedules.'
      },
      {
        imageSrc: 'assets/img/analytics-data-science-database-analysis-statistical-report-information-processing-automation-datacenter-expert-making-report_335657-815.webp',
        title: 'Fully automated system',
        description: 'Going to regular learning centers comes with having to deal with the time-consuming hassle it comes with. Dealing with staff for changing schedules, payment options and many other services can be tiresome. With CDI, all of this is done via the comfort of your device without you having to go anywhere at any given time saving our students valuable time.'
      },
      {
        imageSrc: 'assets/img/Group-535-1.png',
        title: 'Available in multiple countries',
        description: 'We are available in three countries including the US, UK and UAE. Worried if CDI is not available in your region? Our plans of expanding are already under way! You don’t have to worry about time zone differences and inconveniences that come with having to learn online. Instead, all you have to do is focus your full attention on utilizing our online platforms to the fullest.'
      }
    ];

    scholarshipWinner = {
      name: 'Yonas Dereje',
      location: 'UAE',
      imageSrc: 'assets/img/Tewdros.jpg'
    };
  
    scholarshipWinners = Array(6).fill(this.scholarshipWinner);

    cdiBenefits = [
      {
        imgSrc: 'https://via.placeholder.com/80',
        title: 'Your Own Plan',
        description: 'Our extensive experience with both students and teachers has helped us co-design the best teaching methods that don\'t throw you off your usual way of conveying knowledge to your students. We work together with you to create and enhance the best environment for both you and your students.'
      },
      {
        imgSrc: 'https://via.placeholder.com/80',
        title: 'Inspire Others',
        description: 'Your active participation in the teaching process using our platform will help you reignite and spark interest in your students. This creates an enjoyable and informative learning process that appreciates the effort put into teaching inspired trainers new skills they will use in their careers.'
      },
      {
        imgSrc: 'https://via.placeholder.com/80',
        title: 'Expand Your Horizon',
        description: 'If you are a teacher or trainer considering venturing into online platforms to find more opportunities in your line of work, you have found the right place for you. Technology has made it possible for you to set up your office anywhere and start teaching online. CDI 24 is the best platform to teach online classes efficiently.'
      }
    ];
  }
