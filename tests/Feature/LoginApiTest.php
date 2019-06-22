<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void{
        parent::setUp();

        // テストユーザー作成（database/factories/UserFactory.phpにデータあり）
        $this->user = factory(User::class)->create();
    }

    /**
     * @test
     */
    public function should_registeredUserAuthAndResponse(){
        // 第3引数の配列をJSON形式に変化し、第2引数で示されるエンドポイントにPOSTした結果を$responseに格納
        $response = $this->json('POST', route('login'), [
            'email' => $this->user->email,
            'password' => 'password', //secretではない
        ]);

        $response
            ->assertStatus(200)
            ->assertJson(['name' => $this->user->name]);

        $this->assertAuthenticatedAs($this->user);
    }

}
