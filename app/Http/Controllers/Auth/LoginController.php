<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * ログイン認証の内部メソッドオーバーライド
     *
     * @param Request $request
     * @param [type] $user
     * @return void $user
     */
    protected function authenticated(Request $request, $user){
        return $user;
    }

    /**
     * ログアウト認証の内部メソッドオーバーライド
     *
     * @param Request $request
     * @return void
     */
    protected function loggedOut(Request $request){
        // セッションを再生成する
        $request->session()->regenerate();
        // レスポンスをJSONで返す
        return response()->json();
    }
}
