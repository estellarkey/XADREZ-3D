import { Chess, Square,Move } from 'chess.js';

export class ChessBot {
    private chess: Chess;

    constructor(chessInstance: Chess) {
        this.chess = chessInstance;
    }

    public makeRandomMove(): { from: Square, to: Square, promotion?: string } | null {
        const possibleMoves = this.chess.moves({ verbose: true });
        if (possibleMoves.length === 0) return null;

        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        return this.formatMove(randomMove);
    }

    public makeSimpleEvaluatedMove(): { from: Square, to: Square, promotion?: string } | null {
        const possibleMoves = this.chess.moves({ verbose: true });
        if (possibleMoves.length === 0) return null;

        const evaluatedMoves = possibleMoves.map(move => {
            let score = 0;
            
            // Captura de peças
            if (move.captured) {
                score += this.getPieceValue(move.captured);
            }
            
            // Promoção de peão
            if (move.promotion) {
                score += this.getPieceValue(move.promotion) - 1; // Subtrai 1 (valor do peão)
            }
            
            // Xeque
            if (move.san.includes('+')) {
                score += 0.5;
            }
            
            // Roque - dá uma pequena bonificação
            if (move.san === 'O-O' || move.san === 'O-O-O') {
                score += 0.3;
            }
            
            return { move, score };
        });

        evaluatedMoves.sort((a, b) => b.score - a.score);
        
        const topScore = evaluatedMoves[0].score;
        const topMoves = evaluatedMoves.filter(m => m.score === topScore);
        const selectedMove = topMoves[Math.floor(Math.random() * topMoves.length)].move;
        
        return this.formatMove(selectedMove);
    }

    private getPieceValue(piece: string): number {
        switch (piece.toLowerCase()) {
            case 'p': return 1;
            case 'n': return 3;
            case 'b': return 3;
            case 'r': return 5;
            case 'q': return 9;
            case 'k': return 0; // O rei não tem valor em termos de captura
            default: return 0;
        }
    }

    private formatMove(move: Move): { from: Square, to: Square, promotion?: string } {
        // Para roque, o chess.js já retorna as posições corretas do rei
        // Não precisamos fazer nada especial aqui
        return {
            from: move.from,
            to: move.to,
            ...(move.promotion && { promotion: move.promotion })
        };
    }
}