<?php

namespace App\Entity;

use App\Repository\IntervalRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=IntervalRepository::class)
 * @ORM\Table(name="`interval`")
 */
class Interval
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $from_time;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $to_time;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFromTime(): ?string
    {
        return $this->from_time;
    }

    public function setFromTime(string $from_time): self
    {
        $this->from_time = $from_time;

        return $this;
    }

    public function getToTime(): ?string
    {
        return $this->to_time;
    }

    public function setToTime(string $to_time): self
    {
        $this->to_time = $to_time;

        return $this;
    }
}
