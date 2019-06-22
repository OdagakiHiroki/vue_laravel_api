<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void{
        parent::setUp();
        // テストユーザー作成
        $this->user = factory(User::class)->create();
    }

    /**
     * @test
     */
    public function should_returnAuthedUserIfAuthed(){
        // actingAsで作成されたテストユーザー$this->userを認証状態とし、GETでroute('user')で示されるパスにJSONの形でアクセスした際の返り値を$responseに格納
        $response = $this->actingAs($this->user)->json('GET', route('user'));
        $response
            ->assertStatus(200)
            ->assertJson([
                'name' => $this->user->name
            ]);
    }

    /**
     * @test
     */
    public function should_returnBlankStringIfNotAuthed(){
        $response = $this->json('GET', route('user'));
        $response->assertStatus(200);
        $this->assertEquals("", $response->content());
    }
}
