import * as Phaser from 'phaser';
import { questions, Question } from '../questions';

export class GameScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private playerSpeed = 350;
    private choiceGates!: Phaser.Physics.Arcade.Group;
    private background!: Phaser.GameObjects.TileSprite;

    private lives = 3;
    private score = 0;
    private livesText!: Phaser.GameObjects.Text;
    private scoreText!: Phaser.GameObjects.Text;

    private currentQuestionIndex = 0;
    private isGameOver = false;
    private canChoose = true;

    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('player', 'assets/player.png');
        
        // Load tất cả ảnh câu hỏi
        questions.forEach(q => {
            this.load.image(q.image_left, `assets/${q.image_left}`);
            this.load.image(q.image_right, `assets/${q.image_right}`);
        });
    }

    create() {
        // Lấy kích thước logic của game
        const { width, height } = this.scale;

        // Background
        this.background = this.add.tileSprite(width / 2, height / 2, width, height, 'background');

        // Giao diện người dùng (UI)
        this.scoreText = this.add.text(32, 32, `Điểm: 0`, { fontSize: '48px', color: '#FFF', fontStyle: 'bold' });
        this.livesText = this.add.text(width - 32, 32, `Mạng: 3`, { fontSize: '48px', color: '#FFF', fontStyle: 'bold' }).setOrigin(1, 0);

        // Nhân vật
        this.player = this.physics.add.sprite(width / 2, height - 150, 'player');
        this.player.setScale(0.4); 
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard!.createCursorKeys();
        this.choiceGates = this.physics.add.group();

        this.physics.add.overlap(
            this.player,
            this.choiceGates,
            (player, gate) => {
                this.handlePlayerChoice(
                    player as Phaser.Physics.Arcade.Sprite,
                    gate as Phaser.Physics.Arcade.Sprite
                );
            },
            undefined,
            this
        );

        // Bắt đầu game
        this.nextQuestion();
    }

    update() {
        if (this.isGameOver) return;

        // Cuộn background
        this.background.tilePositionY -= 2;

        // Điều khiển
        this.player.setVelocity(0);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex >= questions.length) {
            this.endGame(true); // Thắng
            return;
        }

        this.canChoose = true;
        const question = questions[this.currentQuestionIndex];
        this.spawnChoiceGates(question);
        this.currentQuestionIndex++;
    }

    spawnChoiceGates(question: Question) {
        this.choiceGates.clear(true, true); 

        const { width } = this.scale;

        const leftGate = this.choiceGates.create(width * 0.25, -150, question.image_left);
        leftGate.setData('isCorrect', question.correct_choice === 'left');
        
        const rightGate = this.choiceGates.create(width * 0.75, -150, question.image_right);
        rightGate.setData('isCorrect', question.correct_choice === 'right');

        this.choiceGates.children.iterate(c => {
            const gate = c as Phaser.Physics.Arcade.Sprite;
            gate.setVelocityY(200); // Tăng tốc độ rơi
            gate.setScale(0.6); 
            return true;
        });
    }

    handlePlayerChoice(player: Phaser.Physics.Arcade.Sprite, gate: Phaser.Physics.Arcade.Sprite) {
        if (!this.canChoose) return;
        this.canChoose = false;

        const isCorrect = gate.getData('isCorrect');

        if (isCorrect) {
            this.score += 10;
            this.scoreText.setText(`Điểm: ${this.score}`);
            // Hiệu ứng chọn đúng (ví dụ: màn hình lóe sáng xanh)
            this.cameras.main.flash(300, 0, 255, 0);
        } else {
            this.lives -= 1;
            this.livesText.setText(`Mạng: ${this.lives}`);
             // Hiệu ứng chọn sai (ví dụ: màn hình rung)
            this.cameras.main.shake(300, 0.01);
            if (this.lives <= 0) {
                this.endGame(false); // Thua
                return;
            }
        }
        
        // Xóa tất cả các cổng và chuẩn bị cho câu tiếp theo
        this.choiceGates.clear(true, true);
        this.time.delayedCall(1000, this.nextQuestion, [], this);
    }
    
    endGame(isWin: boolean) {
        this.isGameOver = true;
        this.physics.pause();
        
        const { width, height } = this.scale;
        const message = isWin ? 'CHIẾN THẮNG!' : 'THUA CUỘC!';
        const endText = this.add.text(width / 2, height / 2 - 60, message, { fontSize: '96px', color: '#FFF', fontStyle: 'bold' }).setOrigin(0.5);
        
        this.time.delayedCall(2000, () => {
             this.add.text(width / 2, height / 2 + 40, 'Nhấn để chơi lại', { fontSize: '48px', color: '#FFF' }).setOrigin(0.5);
             this.input.once('pointerdown', () => this.scene.restart());
        });
    }
}
