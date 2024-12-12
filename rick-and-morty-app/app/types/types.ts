// Definieer een type voor een Episode, pas dit aan afhankelijk van de werkelijke gegevens die je ontvangt.
export interface EpisodeItemProps {
  name: string;
  episode: string;
  air_date: string;
  season: string;
}

export interface CharacterListProps {
  characters: Array<{ id: number; name: string; image: string }>;
  isLoading: boolean;
  onPress: (id: number) => void;
  toggleFavorite: (id: number) => void;
  favorites: number[];
}

export interface CharacterItemProps {
  character: { id: number; name: string; image: string };
  onPress: () => void;
  toggleFavorite: (id: number) => void;
  isFavorite: boolean;
}

// RootStackParamList met het Episode type voor de EpisodeDetails route.
export type RootStackParamList = {
  home: undefined;
  details: { id: string };
  episodes: undefined;
  EpisodeDetails: { episode: EpisodeItemProps };
  quiz: undefined;
};
