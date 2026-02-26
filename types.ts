
import React from 'react';

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  logoUrl?: string;
  accentColor?: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatarUrl: string;
  companyLogoUrl: string;
}

export interface Venture {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  link: string;
}


