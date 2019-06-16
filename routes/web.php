<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// すべてのURLでindexテンプレートを返す
Route::get('/{any?}', function () { //{any?}で任意のパスパラメータanyを受け取る（?があるためなくても良い）
    return view('index');
})->where('any', '.+'); //whereメソッドの正規表現でanyに正規表現の.+（任意の文字が1文字以上=なんでもいい）を指定
