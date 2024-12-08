// Definieer een type voor een Episode, pas dit aan afhankelijk van de werkelijke gegevens die je ontvangt.
export type Episode = {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  season: string;
};

// RootStackParamList met het Episode type voor de EpisodeDetails route.
export type RootStackParamList = {
  home: undefined; // Geen parameters
  details: { id: string }; // 'details' verwacht een id (voor bijvoorbeeld een karakter)
  episodes: undefined; // Geen parameters
  EpisodeDetails: { episode: Episode }; // Gebruik het Episode type in plaats van 'any'
};
