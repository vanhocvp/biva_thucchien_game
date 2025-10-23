'use client';

import { useEffect, useRef } from 'react';
import { GameScene } from '@/game/scenes/GameScene';
import * as Phaser from 'phaser';

const PhaserGame = () => {
  const gameContainer = useRef<HTMLDivElement>(null);
  const gameInstance = useRef<Phaser.Game | null>(null); // Thêm ref để theo dõi instance game

  useEffect(() => {
    if (gameInstance.current) {
      // Nếu game đã được tạo, không làm gì cả
      return;
    }

    if (typeof window !== 'undefined' && gameContainer.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameContainer.current!,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 800,  // Đây là kích thước logic của game
          height: 1200, // Tỷ lệ dọc, phù hợp cho điện thoại
        },
        scene: [GameScene],
        backgroundColor: '#1a202c',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
          },
        },
      };

      // Tạo game và lưu instance vào ref
      gameInstance.current = new Phaser.Game(config);
    }

    return () => {
      // Hủy game khi component bị unmount
      gameInstance.current?.destroy(true);
      gameInstance.current = null;
    };
  }, []);

  return <div ref={gameContainer} />;
};

export default PhaserGame;
