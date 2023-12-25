import { Injectable ,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './store.schema';
import mongoose, { Model } from 'mongoose';
import { StoreDto } from './dtos/store.dto';
import { UpdateStoreDto } from './dtos/update-store.dto';

@Injectable()
export class StoreService {
    constructor(@InjectModel(Store.name) private Store :Model<Store> ){}

    addStore(data :StoreDto): Promise<Store>{
        let newStore = new this.Store(data)
        return newStore.save()
    }

    getAllStores(): Promise<Store[]>{
        return this.Store.find()
    }

    getStore(id :mongoose.Types.ObjectId): Promise<Store>{
        return this.Store.findById(id)
    }

    updateStore(id:mongoose.Types.ObjectId,data:UpdateStoreDto): Promise<Store>{
        delete data._id
        return this.Store.findByIdAndUpdate(id,data)
    }

    deleteStore (id : mongoose.Types.ObjectId):Promise<Store>{
        return this.Store.findByIdAndDelete(id)
    }
}
