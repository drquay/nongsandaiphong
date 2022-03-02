import React from "react";
import { useState } from 'react';

function WeightCaculatorForm() {

    const [grossWeight, setGrossWeight] = useState('');
    const [truckWeight, setTruckWeight] = useState('');
    const [netWeight, setNetWeight] = useState('');
    const [price, setPrice] = useState('');
    const [depreciationWeightPerNetWeight, setDepreciationWeightPerNetWeight] = useState('');
    const [depreciationWeightPerTon, setDepreciationWeightPerTon] = useState('');
    const [totalWeight, setTotalWeight] = useState(0);
    const [totalDepreciationWeight, setTotalDepreciationWeight] = useState(0);

    const clearEvent = (e) => {
        e.preventDefault();

        setGrossWeight('');
        setTruckWeight('');
        setNetWeight('');
        setPrice('');
        setDepreciationWeightPerNetWeight('');
        setDepreciationWeightPerTon('');

        setTotalWeight(0);
        setTotalDepreciationWeight(0);
    }

    const calcEvent = (e) => {
        e.preventDefault();

        let netW = netWeight > 0 ? netWeight : grossWeight - truckWeight;
        let depreciationW = 0;

        if (depreciationWeightPerTon > 0) {
            depreciationW += depreciationWeightPerTon * (netW / 1000);
        } else if(depreciationWeightPerNetWeight > 0) {
            depreciationW += depreciationWeightPerNetWeight;
        }
        
        setNetWeight(netW);
        setTotalDepreciationWeight(parseInt(depreciationW));
    }

    return (
        <main>
            <div className="py-5 text-center">
                <h1 className="text-success">NÔNG SẢN ĐẠI PHONG</h1>
            </div>
            <div className="row g-5">
                <div className="col-md-7 col-lg-8">
                <h4 className="mb-3">BẢNG TÍNH TIỀN NÔNG SẢN</h4>
                <form>
                    <div className="row g-3">
                    <div className="col-sm-4">
                        <label className="form-label">SỐ CÂN XE VÀ HÀNG (KG)</label>
                        <input type="number" min="0" step="any" className="form-control" value={grossWeight} onChange={e => setGrossWeight(e.target.value)}/>
                    </div>

                    <div className="col-sm-4">
                        <label className="form-label">SỐ CÂN XE (KG)</label>
                        <input type="number" min="0" step="any" className="form-control" value={truckWeight} onChange={e => setTruckWeight(e.target.value)}/>
                    </div>

                    <div className="col-sm-4">
                        <label className="form-label">SỐ CÂN TOÀN BỘ HÀNG (KG)</label>
                        <input type="number" min="0" step="any" className="form-control" value={netWeight} onChange={e => setNetWeight(e.target.value)}/>
                    </div>

                    <div className="col-12">
                        <label className="form-label">ĐƠN GIÁ (VND)</label>
                        <input type="number" min="0" step="any" className="form-control" value={price} onChange={e => setPrice(e.target.value)}/>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">TRỪ BÌ THEO TẤN (KG)</label>
                        <input type="number" min="0" step="any" className="form-control" value={depreciationWeightPerTon} onChange={e => setDepreciationWeightPerTon(e.target.value)}/>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label"> TRỪ BÌ TRÊN TOÀN BỘ HÀNG (KG) </label>
                        <input type="number" min="0" step="any" className="form-control" value={depreciationWeightPerNetWeight} onChange={e => setDepreciationWeightPerNetWeight(e.target.value)}/>
                    </div>
                    </div>

                    <hr className="my-4" />

                    <button className="w-50 btn btn-primary btn-lg" onClick={calcEvent}> TÍNH TIỀN </button>
                    <button className="w-50 btn btn-danger btn-lg" onClick={clearEvent}> XOÁ </button>
                </form>
                </div>
                <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-primary">HOÁ ĐƠN</span>
                </h4>
                <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 className="my-0">TỔNG SỐ HÀNG (KG)</h6>
                        </div>
                        <span className="text-muted">{netWeight}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 className="my-0">TRỪ BÌ (KG)</h6>
                        </div>
                        <span className="text-muted">{totalDepreciationWeight}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 className="my-0">TỔNG HÀNG CẦN TRẢ (KG)</h6>
                        </div>
                        <span className="text-muted">{netWeight - totalDepreciationWeight}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 className="my-0">ĐƠN GIÁ (VND)</h6>
                        </div>
                        <span className="text-muted">{price}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span>SỐ TIỀN PHẢI TRẢ (VND)</span>
                        <strong>{(netWeight - totalDepreciationWeight) * price}</strong>
                    </li>
                </ul>
                </div>
            </div>
        </main>
  );
}

export default WeightCaculatorForm;
