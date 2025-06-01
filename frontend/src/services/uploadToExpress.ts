export const uploadToExpress = async (file: File): Promise<string> => 
{
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/upload", 
    {
        method: "POST",
        body: formData,
    });

    if (!res.ok) 
    {
        throw new Error("Failed to upload image :(");
    }

    const data = await res.json();
    return data.imageUrl; // ex - /uploads/11111-trash.jpg
};
