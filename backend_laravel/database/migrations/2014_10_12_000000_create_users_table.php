<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap');
            $table->string('slug');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('alamat')->nullable();
            $table->string('tgl_lahir')->nullable();
            $table->enum('jenis_kelamin', ["Pria", "Wanita"])->nullable();
            $table->enum("perawatan", ["Rawat inap", "Rawat jalan"])->default("Rawat Inap");
            $table->string('password');
            $table->boolean('is_login')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
