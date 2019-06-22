<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LogoutApiTest extends TestCase
{
    // 各テスト後にデータベースをリセットする
    use RefreshDatabase;

    public function setUp(): void{
        parent::setUp();

        // テストユーザー作成
        $this->user = factory(User::class)->create();
    }

    /**
     * @test
     */
    public function should_logoutAuthedUser(){
        $response = $this
                        ->actingAs($this->user) // ユーザーを認証済み状態にする（第二引数で認証用に使用するguardを指定可能）
                        ->json('Post', route('logout'));

        $response->assertStatus(200);
        $this->assertGuest(); //ユーザーが認証されていないことをアサートする
    }

}
