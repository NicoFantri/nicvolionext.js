'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Chess } from 'chess.js'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { RefreshCwIcon } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'

const Chessboard = dynamic(() => import('react-chessboard').then(mod => mod.Chessboard), {
  ssr: false,
})

export function ChessBoardComponent({ myUsername }: { myUsername: string }) {
  const game = useRef(new Chess())
  const [fen, setFen] = useState(game.current.fen())
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white')
  const [moveFrom, setMoveFrom] = useState<string | null>(null)

  useEffect(() => {
    const savedFen = localStorage.getItem('chess_fen')
    if (savedFen) {
      try {
        game.current.load(savedFen)
        setFen(savedFen)
      } catch (e) {
        console.error("Invalid saved FEN", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chess_fen', fen)
  }, [fen])

  const makeMove = (move: any) => {
    try {
      // Clone game to test move
      const testGame = new Chess(game.current.fen())
      const result = testGame.move(move)
      
      if (result) {
        game.current.move(move)
        setFen(game.current.fen())
        return true
      }
    } catch (e) {
      console.error("Invalid move:", move, e)
      return false
    }
    return false
  }

  const onDrop = ({ sourceSquare, targetSquare }: any) => {
    if (!targetSquare) return false
    const piece = game.current.get(sourceSquare as any)
    if (piece && piece.color !== game.current.turn()) {
      alert(`Sekarang giliran ${game.current.turn() === 'w' ? 'Putih' : 'Hitam'}!`)
      return false
    }

    const isValidMove = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    })

    if (!isValidMove) {
      alert("Gerakan tidak sah menurut aturan catur!")
    }

    return isValidMove
  }

  const onSquareClick = ({ square }: any) => {
    if (!moveFrom) {
      const piece = game.current.get(square as any)
      if (piece) {
        if (piece.color === game.current.turn()) {
          setMoveFrom(square)
        } else {
          alert(`Sekarang giliran ${game.current.turn() === 'w' ? 'Putih' : 'Hitam'}!`)
        }
      }
      return
    }

    const isValidMove = makeMove({
      from: moveFrom,
      to: square,
      promotion: 'q'
    })

    if (!isValidMove) {
      const piece = game.current.get(square as any)
      if (piece && piece.color === game.current.turn()) {
        setMoveFrom(square)
      } else {
        alert("Gerakan tidak sah menurut aturan catur!")
        setMoveFrom(null)
      }
    } else {
      setMoveFrom(null)
    }
  }

  const resetGame = () => {
    game.current.reset()
    setFen(game.current.fen())
    setMoveFrom(null)
  }

  let status = ''
  if (game.current.isCheckmate()) {
    status = `Skakmat! ${game.current.turn() === 'w' ? 'Hitam' : 'Putih'} Menang.`
  } else if (game.current.isDraw()) {
    status = 'Permainan Berakhir! Seri.'
  } else {
    status = `Giliran: ${game.current.turn() === 'w' ? 'Putih' : 'Hitam'}`
  }

  const customSquareStyles = {} as any
  if (moveFrom) {
    customSquareStyles[moveFrom] = { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
  }

  return (
    <div className="relative h-full w-full rounded-xl p-[2px] group">
      <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-[calc(0.75rem-2px)] p-6 shadow-sm flex flex-col h-full items-center justify-center relative z-10">
        <div className="flex w-full justify-between items-center mb-4 text-sm font-medium">
        <div className="text-primary font-bold">{status}</div>
      </div>

      <div className="w-full max-w-[400px] aspect-square">
        <Chessboard 
          options={{
            position: fen,
            onPieceDrop: onDrop,
            onSquareClick: onSquareClick,
            boardOrientation: boardOrientation,
            allowDragging: true,
            darkSquareStyle: { backgroundColor: '#779556' },
            lightSquareStyle: { backgroundColor: '#ebecd0' },
            squareStyles: customSquareStyles,
            animationDurationInMs: 200,
          }}
        />
      </div>

      <div className="mt-4 flex gap-2 w-full max-w-[400px] justify-between">
        <Button variant="outline" size="sm" onClick={() => setBoardOrientation(prev => prev === 'white' ? 'black' : 'white')}>
          Putar Papan
        </Button>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RefreshCwIcon className="w-4 h-4 mr-2" />
          Reset Papan
        </Button>
      </div>
      </div>
    </div>
  )
}
