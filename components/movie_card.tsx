import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import { MovieInterface } from '@/types';


interface MovieCardProps {
  data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();


  const redirectToWatch = useCallback(() => router.push(`/watch/${data.id}`), [router, data.id]);

  return (
    <></>
  )
}

export default MovieCard;
