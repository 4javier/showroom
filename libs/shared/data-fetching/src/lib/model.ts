export interface GithubSerializedSearch {
    total_count: number;
    items: GithubSerializedRepo[]
}

export interface GithubSerializedRepo {
    name: string;
    description: string;
}

export interface GitlabSerializedRepo {
    name: string;
    description: string;
    topics: string[];
}

export interface DevtoSerializedArticle {
    canonical_url: string;
    cover_img: string;
    description: string;
    title: string;
    type_of: string;
}

export interface SlideData {
    title: string;
    image: string;
    content: string;
    link: string;
    origin?: string;
}
