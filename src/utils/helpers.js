export const getFilenameFromURI = uri => uri.substring(uri.lastIndexOf('/') + 1);

export const getTypeFromImage = image => `${image.type}/${image.uri.substring(image.uri.lastIndexOf('.') + 1)}`;
