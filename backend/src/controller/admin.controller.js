import { Song } from "../models/song.model.js";
import{ Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function for uploading to cloudinary
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilepath, {
            resource_type: 'audio',
        }
    )
    return result.secure_url;
    } catch (error) {
        console.log("Error in uploading to cloudinary", error);
        throw new Error("Failed to upload to cloudinary");
    }
}

export const createSong = async (req, res, next) => {
    try {
        if(req.files || !req.files.audioFile || !req.files.imageFile)
        {
            return res.status(400).json({ message: "Please upload all files" });
        }

        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(audioFile);
        
        const song = new Song({
            title,
            artist,
            albumId,
            duration,
            albumId: albumId || null,
        })

        await song.save()


        //if song belongs to an album, update album's songs array
        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push: { songs: song._id }
            })
        }
        res.status(201).json(song)
     } catch (error) {
        console.log("Error in creating song", error);
        next(error);
    }
};

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);

        //if song belongs to an album, remove song from album's songs array
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull: { songs: song._id },
            })
        }

        await Song.findByIdAndDelete(id);

        res.status(200).json({ message: "Song deleted successfully" });

    } catch (error) {
        console.log("Error in deleting song", error);
        next(error);
        
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body; 
        const { imageFile } = req.files;
        const imageUrl = await uploadToCloudinary(imageFile);
        
        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        })

        await album.save()

        res.status(201).json(album)
    } catch (error) {
        console.log("Error in creating album", error);
        next(error);
    }
}


export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({ albumId: id });
        const album = await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully" });

    } catch (error) {

        console.log("Error in deleting album", error);
        next(error);
        
    }
    
}


export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ admin: true});
}
