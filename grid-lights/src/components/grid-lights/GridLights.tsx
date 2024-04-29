import { useEffect, useState } from 'react';
import styles from './GridLights.module.css';
import cn from 'clsx';

type Props = {};

const GridLights = (props: Props) => {
  const tiles = [...new Array(9)].map((_, index) => index);
  const [clickedTiles, setClickedTiles] = useState<number[]>([]);

  useEffect(() => {
    if (clickedTiles.length === 8) {
      const unClickTiles = setInterval(() => {
        setClickedTiles(prev => {
          if (prev.length === 0) {
            clearInterval(unClickTiles);
            return [];
          }
          return prev.slice(0, -1);
        });
      }, 500);
    }
  }, [clickedTiles]);

  return (
    <div className={styles.grid}>
      {tiles.map(item => (
        <div
          onClick={() => setClickedTiles([...clickedTiles, item])}
          className={cn(styles.grid__tile, {
            [styles['grid__tile-active']]: item !== 4 && clickedTiles.includes(item),
            [styles['grid__tile-disabled']]: item === 4,
          })}
          key={item}
        ></div>
      ))}
    </div>
  );
};

export default GridLights;
