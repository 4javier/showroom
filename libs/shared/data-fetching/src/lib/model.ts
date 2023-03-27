export interface GithubSerializedSearch {
  total_count: number;
  items: GithubSerializedRepo[];
}

export interface GithubSerializedRepo {
  name: string;
  description: string;
  id: string;
}

export interface GithubRepoDTO extends GithubSerializedRepo {
  origin: string;
  imageUrl: string;
}

export interface GitlabSerializedRepo {
  name: string;
  description: string;
  topics: string[];
  id: string;
}

export interface GitlabRepoDTO extends GitlabSerializedRepo {
  origin: string;
  imageUrl: string;
}

export interface DevtoSerializedArticle {
  canonical_url: string;
  cover_image: string;
  description: string;
  organization?: {
    name: string;
  };
  title: string;
  type_of: string;
}

export interface SlideData {
  title: string;
  subtitle?: string;
  image?: string;
  content: string;
  link: string;
  origin?: string;
}
