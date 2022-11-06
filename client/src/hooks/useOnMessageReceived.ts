import { useEffect, useRef } from "react";
import useSocket from "./useSocket";
import { useParams } from 'react-router-dom';

export default function useOnMessageReceived(listener: (...args: any[]) => void) {
  const { id } = useParams();
  const functionRefs = useRef({
    socket: useSocket(),
    listener,
  });
  
  useEffect(() => {
    const onMessageListener = functionRefs.current?.socket?.on("onMessage", functionRefs.current.listener);

    return () => {
      onMessageListener.off("onMessage");
    }
  }, [id])
}