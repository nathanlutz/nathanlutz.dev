export interface PaperMetadata {
  title: string;
  authors: string;
  publicationDate: string;
  postDate: string;
  tags: string[];
  paperUrl: string;
  slug: string;
}

export interface Paper {
  metadata: PaperMetadata;
  content: string;
  filePath: string;
}
