export default ({ env }) => {
  const uploadConfig =
    env("CLOUDINARY_NAME") && env("CLOUDINARY_KEY") && env("CLOUDINARY_SECRET")
      ? {
          provider: "cloudinary",
          providerOptions: {
            cloud_name: env("CLOUDINARY_NAME"),
            api_key: env("CLOUDINARY_KEY"),
            api_secret: env("CLOUDINARY_SECRET"),
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        }
      : {
          // Використовуємо локальний провайдер якщо Cloudinary не налаштовано
          provider: "local",
          providerOptions: {},
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        };

  // Cloudinary free tier: зображення макс 10 MB, відео макс 100 MB.
  // Якщо не обмежити — велике зображення відхилить Cloudinary, а thumbnail може вже потрапити в CDN.
  const sizeLimit =
    uploadConfig.provider === "cloudinary"
      ? 10 * 1024 * 1024
      : 200 * 1024 * 1024; // 10 MB для Cloudinary (зображення), 200 MB для local

  return {
    cloud: {
      enabled: false,
    },
    upload: {
      config: {
        ...uploadConfig,
        sizeLimit,
      },
    },
  };
};
