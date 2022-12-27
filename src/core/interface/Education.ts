export interface IEducationDto {
  access_level: number;
  title: string;
  subtitle: string;
  description: string;
  videos: IVideoDto[];
}

export interface IVideoDto {
  preview_image: string;
  link: string | null;
  tags: string;
  themes: string;
  result: string;
}
