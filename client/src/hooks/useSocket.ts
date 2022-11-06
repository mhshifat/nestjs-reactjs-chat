import { useContext } from 'react';
import { SocketContext } from '../utils/contexts/SocketContext';

export default function useSocket() {
  return useContext(SocketContext)
}