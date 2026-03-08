import { Media } from '@/lib//types/media';

export async function uploadFile(file: File) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${apiUrl}/api/media/upload`, {
        headers: {
           'Acceess-Control-Allow-Origin': '*',
        },
        method: 'POST',
        body: formData,
        credentials: 'include',
    });


    if (!res.ok) {
        throw new Error('Failed to upload file');
    }
    const data = await res.json();
    return data as Media;
}

export async function deleteFile(fileId: number) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/media/${fileId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!res.ok) {
        console.log("Failed to delete file with ID:", fileId);
        throw new Error('Failed to delete file');
    }

    const data = await res.json();
    return data;
}
