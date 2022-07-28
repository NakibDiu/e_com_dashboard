<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Models\Product;

class productController extends Controller
{
    function addProducts(Request $req) {
        $product = new Product;
        $product->name= $req->input('name');
        $product->description= $req->input('description');
        $product->price= $req->input('price');
        $product->image_path= $req->file('image_path')->store('images');
        $product->save();
        return $product;
    }

    function list() {
        return Product::all();
    }

    function delete($id) {
        $response = Product::where('id', $id)->delete();
        if ($response) {
            return "Product has been deleted";
        } else {
            return "Operation Failed";
        }
    }

    function getProduct($id) {
        return Product::find($id);
    }

    function updateProduct($id, Request $req) {
        $product = Product::find($id);
        $product->name= $req->input('name');
        $product->description= $req->input('description');
        $product->price= $req->input('price');
        if ($req->file()) {
            $product->image_path= $req->file('image_path')->store('products');
        }
        $product->save();
        return $product;
    }

    function search($key) {
        return Product::where('name', 'LIKE', "%$key%")->get();
    }
}
