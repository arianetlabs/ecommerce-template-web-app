<?php

namespace App\Concerns;

use Illuminate\Support\Str;
use LogicException;

trait GeneratesCode
{
    protected static function bootGeneratesCode(): void
    {
        static::creating(function (self $model): void {
            if ($model->getAttribute($model->codeColumn()) !== null) {
                return;
            }

            $model->setAttribute($model->codeColumn(), $model->generateUniqueCode());
        });
    }

    protected function generateUniqueCode(): string
    {
        $prefix = $this->codePrefix();
        $suffixLength = $this->codeLength() - strlen($prefix);

        if ($suffixLength < 1) {
            throw new LogicException(sprintf(
                'The code length for %s must be greater than the prefix length.',
                static::class,
            ));
        }

        do {
            $code = $prefix.Str::upper(Str::random($suffixLength));
        } while (static::query()->where($this->codeColumn(), $code)->exists());

        return $code;
    }

    protected function codeColumn(): string
    {
        return 'code';
    }

    abstract protected function codePrefix(): string;

    abstract protected function codeLength(): int;
}
