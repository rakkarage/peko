using Bridge;
using static Retyped.phaser.Phaser;

namespace PhaserDemo.Games
{
    public abstract class AbstractGameState : State
    {
        [Name("preload")]
        public virtual void Preload()
        {
        }

        [Name("create")]
        public virtual void Create()
        {
        }

        [Name("update")]
        public virtual void Update()
        {
        }

        [Name("render")]
        public virtual void Render()
        {
        }
    }
}
