export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    id: "why-i-chose-software-engineering",
    title: "Why I Chose Software Engineering: A Newbie's Perspective",
    excerpt: "As a final-year student in BEng Software Engineering, I'm excited to share my journey and reflections on why I chose this field.",
    content: `

As a final-year student in BEng Software Engineering, I'm excited to share my journey and reflections on why I chose this field.

My fascination with technology began when I was just 13 years old, in 8th grade. I was the kid who couldn't stop talking about the latest tech updates and gadgets. This passion led me to join the Computer Society at my school. Joining this society was one of the best decisions I made. I often found myself skipping regular classes to spend time in the computer lab, troubleshooting issues, and networking PCs. During this time, I also started a YouTube channel called "YBM Creators," where I created content on game development using FPS Creator and Game Guru.

By grade 10, my interests shifted towards IoT. I began working on small projects with Arduino and Raspberry Pi, including line-following robots, autonomous fire extinguisher vehicles, and various LCD patterns. One of my proudest moments came in 2018 when I was invited to be a trainer at an IT workshop organized by the Ministry of Education in Sri Lanka. Teaching school teachers and advanced-level students about IoT was incredibly motivating. It was around this time that I first heard the term "Software Engineering" from a Sri Lankan tech content creator named Chanux Bro. His video about his journey into the field made me realize this was a path I wanted to explore.

In addition to my passion for technology, I was fortunate to receive a scholarship for my degree program. This opportunity allowed me to balance my software engineering degree with my Advanced Level studies, and I successfully passed the GCE A/L exams. Starting university, I quickly realized that while I had a passion for technology, I was just one among many students with advanced knowledge. Some modules were challenging and pushed me beyond my comfort zone. Despite these difficulties, I never lost my enthusiasm. The support from my peers and lecturers, combined with my excitement for building new projects, kept me motivated.

Recently, I've started contributing to open-source projects and volunteering, which has been both fulfilling and educational. Working on web projects has allowed me to expand my technical skills and explore new areas within software engineering. Looking back, I'm truly grateful for my decision to pursue a degree in this field. It's been a rewarding journey full of challenges and learning experiences.

I hope my story resonates with others who are considering or are new to this field. If you're passionate about technology and eager to learn, dive in and explore. Follow me for more updates and insights, and let's keep engaging and learning together!
    `,
    date: "Aug 16, 2024",
    readTime: "2 min read",
    category: "Personal Journey",
    tags: ["Software Engineering", "Career", "Technology", "Journey"],
    image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*kyTvAglpKqKm-bNu",
    author: {
      name: "Yasas Banuka",
      avatar: "/images/about/yasas-banuka-professional-headshot-square.jpg",
      bio: "Software Engineering student passionate about building tech solutions and sharing knowledge."
    }
  }
];

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}
