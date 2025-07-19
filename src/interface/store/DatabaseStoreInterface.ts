export interface DatabaseState {
  databaseLoaded: boolean;
  databaseLoadingError: boolean;
  setDatabaseLoaded: (status: boolean) => void;
  setDatabaseLoadingError: (status: boolean) => void;
  loadDatabase: () => Promise<void>;
}
