import { Injectable ,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './store.schema';
import mongoose, { Model } from 'mongoose';
import { StoreDto } from './dtos/store.dto';
import { UpdateStoreDto } from './dtos/update-store.dto';

@Injectable()
export class StoreService {
    constructor(@InjectModel(Store.name) private Store :Model<Store> ){}

    addStore(data :StoreDto){
        let newStore = new this.Store(data)
        return newStore.save()
    }

    getAllStores(){
        return this.Store.find()
    }

    getStore(id :mongoose.Types.ObjectId){
        return this.Store.findById(id)
    }

    updateStore(id:mongoose.Types.ObjectId,data:UpdateStoreDto){
        delete data._id
        return this.Store.findByIdAndUpdate(id,data)
    }
}
