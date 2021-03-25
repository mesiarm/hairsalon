<?php

namespace App\Entity;

use App\Repository\ReservationRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ReservationRepository::class)
 */
class Reservation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Day::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $day;

    /**
     * @ORM\ManyToOne(targetEntity=Interval::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $time_interval;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDay(): ?Day
    {
        return $this->day;
    }

    public function setDay(?Day $day): self
    {
        $this->day = $day;

        return $this;
    }

    public function getTimeInterval(): ?Interval
    {
        return $this->time_interval;
    }

    public function setTimeInterval(?Interval $time_interval): self
    {
        $this->time_interval = $time_interval;

        return $this;
    }
}
