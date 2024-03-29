/** Removes file type and extension from base64 string */
export const getContent = (base64: string) => {
  return base64.substring(base64.indexOf(",") + 1);
};

/**
 * Reads JS File, and returns base64 content alongside
 * with file size, type and content ready to be uploaded to gql.
 * [raw content]: Full base64 string (with file type)
 * [content]: base64 without file type.
 * [size]: File size in bytes
 * [fileType]: File extension and type. Type is based on following specs:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 */
export const parseFile = (
  file: File
): Promise<{
  rawContent: string;
  content: string;
  fileType: { type: string; extension: string };
  size: number;
}> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve({
        rawContent: reader.result as string,
        // content stripped of format prefix used as payload when submitting to gql
        content: getContent(reader.result as string),
        fileType: getFileType(file),
        size: file.size,
      });
    };
    reader.onerror = (error) => reject(error);
  });

/**
 * Returns extension (.jpg, .doc, ...) and file type (image, audio, video...)
 */
export const getFileType = (file: File) => {
  const [type, extension] = file.type.split("/");
  return {
    type,
    extension,
  };
};

/**
 * Gets original image size based on URL or Base64 format
 */
export const getImageSize = (
  source: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = (e) => {
      resolve({
        width: image.width,
        height: image.height,
      });
    };
    image.src = source;
  });
};

export const parseFileAsArrayBuffer = (
  file: File
): Promise<{
  rawLog: ArrayBuffer;
}> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve({
        rawLog: reader.result as ArrayBuffer,
      });
    };
    reader.onerror = (error) => reject(error);
  });
