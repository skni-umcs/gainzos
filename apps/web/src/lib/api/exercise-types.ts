import { ExerciseType } from "@/lib/types/exercise-type";

export async function fetchExercisesTypes(): Promise<ExerciseType[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/exercises-types/getAll`, {
    method: 'GET',
    next: { revalidate: 60 },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch exercises types');
  }

  const data = await res.json();
  return data as ExerciseType[];
}


export async function addExerciseType(exerciseType: ExerciseType) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/exercises-types/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(exerciseType)
  });

  if (!res.ok) {
    throw new Error('Failed to add exercise type');
  }
  const data = await res.json(); 

  const message = data.message ? String(data.message) : 'Success';
  return { message, success: true };

}

export async function updateExerciseType(exerciseType: ExerciseType) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


  const res = await fetch(`${apiUrl}/api/exercises-types/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(exerciseType)
  });

  if (!res.ok) {
    throw new Error('Failed to update exercise type');
  }

  const data = await res.json();
  const message = data.message ? String(data.message) : 'Success';
  return { message, success: true };
}


export async function deleteExerciseType(exerciseTypeId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/exercises-types/${exerciseTypeId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to delete exercise type');
  }

  const data = await res.json();
  const message = data.message ? String(data.message) : 'Success';
  return { message, success: true };
}

export async function fetchExerciseTypeById(exerciseTypeId: string): Promise<ExerciseType> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/exercises-types/byId/${exerciseTypeId}`, {
    method: 'GET',
    next: { revalidate: 60 },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch exercise type');
  }

  const data = await res.json();
  return data as ExerciseType;
}
