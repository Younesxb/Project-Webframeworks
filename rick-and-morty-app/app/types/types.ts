// Definieer een type voor een Episode, pas dit aan afhankelijk van de werkelijke gegevens die je ontvangt.
export interface Episode  {
  name: string;
  episode: string;
  air_date: string;
  season: string;
};



// RootStackParamList met het Episode type voor de EpisodeDetails route.
export type RootStackParamList = {
  home: undefined;
  details: { id: string };
  episodes: undefined;
  EpisodeDetails: { episode: Episode };
  quiz: undefined;
};