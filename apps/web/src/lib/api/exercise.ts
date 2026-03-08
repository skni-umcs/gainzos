import { Exercise } from '@/lib/types/exercise';


export async function fetchExercises(): Promise<Exercise[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/exercises/getAll`, {
    method: 'GET',
    next: { revalidate: 60 },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch exercises');
  }

  const data = await res.json();
  return data as Exercise[];
}


export async function addExercise(exercise: Exercise) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/exercises/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exercise),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to add exercise');
  }

  const data = await res.json();
  const message = data.message ? String(data.message) : 'Success';
  return { message, success: true };
}


export async function updateExercise(exercise: Exercise) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/exercises/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exercise),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to update exercise');
  }

  const data = await res.json();
  const message = typeof data === 'object' && data !== null && 'message' in data 
    ? String(data.message) 
    : 'Success';
  return { message, success: true };
}


export async function deleteExercise(exerciseId: number) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/exercises/${exerciseId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to delete exercise');
  }
  const data = await res.json();
  const message = typeof data === 'object' && data !== null && 'message' in data 
    ? String(data.message) 
    : 'Success';
  return { message, success: true };
}


export async function getExerciseById(exerciseId: number): Promise<Exercise> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/exercises/byId/${exerciseId}`, {
    method: 'GET',
    next: { revalidate: 60 },
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch exercise');
  }
  const data = await res.json();
  return data as Exercise;
}
