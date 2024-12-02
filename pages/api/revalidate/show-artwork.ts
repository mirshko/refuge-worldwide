import { NextApiRequest, NextApiResponse } from "next";
import { managementClient, client } from "../../../lib/contentful/client";
import cloudinary from "cloudinary";
import { showArtworkURL } from "../../../util";
import { uploadImage, updateArtwork } from "../../../lib/contentful/management";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (process.env.CF_WEBHOOK_SECRET !== req.headers["webhook_secret"]) {
  //   return res.status(401).json({ message: "Invalid Secret" });
  // }

  if (req.method === "POST") {
    try {
      const show = req.body;

      // Add your revalidation logic here
      const coverImageId = show.coverImage.sys.id;

      // Fetch the asset details from Contentful
      const asset = await client.getAsset(coverImageId);

      // Extract the URL of the cover image
      const coverImageUrl = `https:${asset.fields.file.url}`;

      // Upload the image to Cloudinary using regular upload
      const result = await cloudinary.v2.uploader.upload(coverImageUrl);

      // Fetch the artist entries from Contentful
      const artistIds = show.artists.map((artist) => artist.sys.id);
      const artistEntries = await Promise.all(
        artistIds.map((id) => client.getEntry(id))
      );

      const artists = artistEntries.map((entry) => ({
        label: entry.fields.name,
      }));

      const showTitle = show.title.split(" | ")[0];

      const values = {
        image: [{ url: result.url }],
        showName: showTitle,
        artists: artists,
        datetime: show.date,
        datetimeEnd: show.dateEnd,
      };

      const url = showArtworkURL(values, false);

      const artwork = {
        type: "image/png",
        filename: showTitle + " - show artwork",
        url: url,
      };

      const artworkId = await uploadImage(
        showTitle + " - show artwork",
        artwork
      );
      console.log(artworkId);
      await updateArtwork(show.id, artworkId);

      res.status(200).json({ message: "Revalidation triggered successfully!" });
    } catch (error) {
      console.error("Revalidation error:", error);
      res.status(500).json({ error: "Failed to revalidate." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
