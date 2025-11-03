export type TCommonProps = {
  title?: string;
  name?: string;
  icon?: string;
};

export type TExperience = {
  companyName: string;
  iconBg: string;
  date: string;
  points: string[];
} & Required<Omit<TCommonProps, "name">>;

export type TTestimonial = {
  testimonial: string;
  designation: string;
  company: string;
  image: string;
} & Required<Pick<TCommonProps, "name">>;

export type TProject = {
  id: string;
  description: string;
  detailedDescription?: string;
  shortDescription?: string;
  tags: {
    name: string;
    color: string;
  }[];
  image: string;
  gallery?: string[];
  video?: string;
  additionalVideos?: string[];
  liveDemoLink?: string;
  sourceCodeLink: string;
  technologies?: string[];
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  duration?: string;
  teamSize?: string;
  role?: string;
  client?: string;
  year?: string;
  order?: number;
} & Required<Pick<TCommonProps, "name">>;

export type TTechnology = Required<Omit<TCommonProps, "title">>;

export type TNavLink = {
  id: string;
} & Required<Pick<TCommonProps, "title">>;

export type TService = Required<Omit<TCommonProps, "name">>;

export type TMotion = {
  direction: "up" | "down" | "left" | "right" | "";
  type: "tween" | "spring" | "just" | "";
  delay: number;
  duration: number;
};
