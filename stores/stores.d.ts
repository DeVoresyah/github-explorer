interface StoreState<T> {
  _fetching: boolean;
  _data: T;
  _error: string;
}
