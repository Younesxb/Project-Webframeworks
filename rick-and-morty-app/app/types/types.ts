export interface EpisodeItemProps {
  name: string;
  episode: string;
  air_date: string;
  season: string;
}


export interface Character {
  id: number;
  name: string;
  image: string;
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

export interface HomeScreenProps {
  navigation: {
    navigate: (screen: string, params?: { id: number }) => void;
  };
}

export type RootStackParamList = {
  welcome: undefined;
  home: undefined;
  details: { id: string };
  episodes: undefined;
  quiz: undefined;
};
