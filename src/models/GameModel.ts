export interface GameData {
  id: string;
  slug: string;
  title: string;
  startUrl: string | undefined;
  providerName: string;
  thumb: {
    url: string;
  };
}
