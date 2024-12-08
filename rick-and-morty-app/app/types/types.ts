export type RootStackParamList = {
  home: undefined; // Geen parameters
  details: { id: string }; // 'details' verwacht een id
  episodes: undefined; // Geen parameters
  EpisodeDetails: { episode: any }; // Consistente naam voor details
};
