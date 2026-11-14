<?php

namespace App\Models;

use App\Concerns\GeneratesCode;
use Cviebrock\EloquentSluggable\Sluggable;
use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'slug', 'code', 'parent_id', 'short_description', 'is_active'])]
class Category extends Model
{
    /** @use HasFactory<CategoryFactory> */
    use GeneratesCode, HasFactory, HasUlids, Sluggable;

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    protected function codePrefix(): string
    {
        return 'CA';
    }

    protected function codeLength(): int
    {
        return 6;
    }

    /** @return BelongsTo<Category, $this> */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /** @return HasMany<Category, $this> */
    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /** @return HasMany<Product, $this> */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function canMoveUnder(string $parentId): bool
    {
        $parents = self::query()->pluck('parent_id', 'id');
        $visited = [$this->getKey() => true];

        while ($parentId !== null) {
            if (isset($visited[$parentId])) {
                return false;
            }

            $visited[$parentId] = true;
            $parentId = $parents->get($parentId);
        }

        return true;
    }

    /** @return array{slug: array{source: string, onUpdate: bool, maxLength: int}} */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
                'onUpdate' => false,
                'maxLength' => 128,
            ],
        ];
    }
}
