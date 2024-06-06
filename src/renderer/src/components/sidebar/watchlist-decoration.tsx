export interface WatchlistDecorationProps {
  active: boolean
}

export function WatchlistDecoration({ active }: WatchlistDecorationProps) {
  return (
    active ? <div style={{ marginLeft: 'auto', backgroundColor: '#f9c70c', height: '100%', borderRadius: '100%', aspectRatio: '1/1' }} /> : null
  );
}
